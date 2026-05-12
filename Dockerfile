# Source: https://nextjs.org/docs/app/guides/self-hosting#docker-image
FROM node:20-alpine AS runner

# CapRover передаёт build-arg; в этом образе Next уже собран в CI (в слоях только .next/*).
# ARG нужны, чтобы Docker «принял» аргументы и не писал unconsumed build-args.
# NEXT_PUBLIC_* вшиваются при `npm run build` в GitHub Actions — см. .github/workflows/main.yml.
# ADMIN_*, SUPABASE_SERVICE_ROLE_KEY — runtime в CapRover App Config, не в образ.
ARG ADMIN_PASSWORD
ARG NEXT_PUBLIC_CHATWOOT_BASE_URL
ARG NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID
ARG SUPABASE_SERVICE_ROLE_KEY

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Порядок как в Next: сначала standalone, иначе .next/static может затереться.
# Source: https://nextjs.org/docs/app/guides/self-hosting#docker-image
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
