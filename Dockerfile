# Source: https://nextjs.org/docs/app/guides/self-hosting#docker-image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY public ./public
COPY .next/static ./.next/static
COPY .next/standalone ./

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
