import { DataloaderService } from './dataloader.service';

export type GqlLoaders = ReturnType<DataloaderService['createLoaders']>;

export interface GqlContext {
  req: Record<string, any>;
  res: Record<string, any>;
  loaders: GqlLoaders;
}
