FROM node:22.6.0-slim

WORKDIR /app

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY ./hono/package.json ./hono/package-lock.json ./hono/bun.lockb ./

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash \
    && echo 'export BUN_INSTALL="$HOME/.bun"' >> $HOME/.bashrc \
    && echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> $HOME/.bashrc

# Use Bash as the shell and source .bashrc
SHELL ["/bin/bash", "-c"]
RUN source $HOME/.bashrc && bun install

# Copy the rest of the application
COPY ./hono .

# Expose the port your app runs on
EXPOSE 3000

CMD ["bun", "dev"]