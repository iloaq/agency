# Source: https://nextjs.org/docs/app/guides/self-hosting#docker-image
FROM node:20-alpine AS runner

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
