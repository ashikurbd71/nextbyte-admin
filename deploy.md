1. Make sure .env contains the pruduction env vars (eg API URLs)
2. Run `npm run build:docker:force`
3. Run `ssh ashikurovi@152.53.152.38`
4. Run `cd appdata/next-byte-institute/nextbyte-admin`
5. Run `docker stack deploy --with-registry-auth -c docker-stack.yml nextbyte-admin`
6. Run `docker service update --with-registry-auth --image codehub.farhansadiq.dev/next-byte-institute/nextbyte-admin:latest nextbyte-admin_nextbyte-admin || true`
7. Run `exit`