  # Use the oven/bun image
  FROM oven/bun

  # Set the working directory in the container to /app
  WORKDIR /app

  # Copy package.json and bun.lockb to the working directory
  COPY package.json bun.lockb ./

  # Install dependencies
  RUN bun install --frozen-lockfile

  # Copy the rest of the application code to the working directory
  COPY . .

  # Build the application
  RUN bun build src/server.ts --outdir out --target bun

  # Expose port 3000
  EXPOSE 3000

  # Run the application
  CMD ["bun", "out/server.js"]
