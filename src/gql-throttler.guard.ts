import { timingSafeEqual } from 'crypto';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext): {
    req: Request;
    res: Response;
  } {
    if (context.getType<string>() === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext<{ req: Request; res: Response }>();
      return { req: ctx.req, res: ctx.res };
    }

    const http = context.switchToHttp();
    return { req: http.getRequest(), res: http.getResponse() };
  }

  protected shouldSkip(context: ExecutionContext): Promise<boolean> {
    const { req } = this.getRequestResponse(context);
    const rawApiKey = req.headers?.['x-api-key'];
    const apiKey = Array.isArray(rawApiKey) ? rawApiKey[0] : rawApiKey;
    const validKey = process.env['INTERNAL_API_KEY'];

    if (typeof apiKey !== 'string' || typeof validKey !== 'string') {
      return Promise.resolve(false);
    }

    // timingSafeEqual previene timing attacks: tarda exactamente el mismo
    // tiempo independientemente de cuántos caracteres coincidan, haciendo
    // imposible adivinar la clave midiendo tiempos de respuesta.
    if (apiKey.length !== validKey.length) return Promise.resolve(false);
    return Promise.resolve(
      timingSafeEqual(Buffer.from(apiKey), Buffer.from(validKey)),
    );
  }
}
