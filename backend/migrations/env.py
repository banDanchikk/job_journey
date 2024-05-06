from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context
import os
import sys

# Add the parent directory of the current directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

# Import the required modules from your backend
from backend.src.database import Base
from backend.src.config import DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASS

# Set up logging configuration if available
if context.config.config_file_name:
    fileConfig(context.config.config_file_name)

# Set database configuration options
section = context.config.config_ini_section
context.config.set_section_option(section, "DB_HOST", DB_HOST)
context.config.set_section_option(section, "DB_PORT", DB_PORT)
context.config.set_section_option(section, "DB_USER", DB_USER)
context.config.set_section_option(section, "DB_NAME", DB_NAME)
context.config.set_section_option(section, "DB_PASS", DB_PASS)

# Specify the target metadata for autogenerate support
target_metadata = Base.metadata

def run_migrations_offline():
    # Run migrations in 'offline' mode
    url = context.config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    # Run migrations in 'online' mode
    connectable = engine_from_config(
        context.config.get_section(context.config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
