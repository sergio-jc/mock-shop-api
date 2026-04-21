import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

// Logs
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';

// Traces
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const disabled =
  process.env.OTEL_SDK_DISABLED === 'true' || process.env.NODE_ENV === 'test';

if (!disabled) {
  const tracesUrl =
    process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ??
    'http://localhost:4318/v1/traces';

  const logsUrl =
    process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT ??
    'http://localhost:4318/v1/logs';

  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? 'mock-shop-api',
    }),
    traceExporter: new OTLPTraceExporter({ url: tracesUrl }),
    logRecordProcessors: [
      new BatchLogRecordProcessor(new OTLPLogExporter({ url: logsUrl })),
    ],
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
  });

  sdk.start();

  const shutdown = () => sdk.shutdown().catch(() => undefined);

  process.once('SIGTERM', shutdown as () => void);
  process.once('SIGINT', shutdown as () => void);
}
