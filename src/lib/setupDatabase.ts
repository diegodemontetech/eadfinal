import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vrbdlyfkzelfuruelams.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyYmRseWZremVsZnVydWVsYW1zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjgwNTE0MiwiZXhwIjoyMDQ4MzgxMTQyfQ.QSefavWla4N0wZpEW6sTfNRIQb8T2wV983ywslGjGpw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    // Enable UUID extension
    const { error: extensionError } = await supabase.rpc('create_extension', {
      name: 'uuid-ossp'
    });

    if (extensionError) {
      console.error('Error enabling extension:', extensionError);
      return;
    }

    // Create tables
    const { error: tablesError } = await supabase.rpc('create_tables', {
      sql: `
        -- Users table
        create table if not exists public.users (
          id uuid primary key default uuid_generate_v4(),
          name text not null,
          email text unique not null,
          avatar_url text,
          role text default 'user',
          created_at timestamp with time zone default timezone('utc'::text, now()) not null,
          updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );

        -- Categories table
        create table if not exists public.categories (
          id uuid primary key default uuid_generate_v4(),
          name text not null unique,
          description text,
          is_active boolean default true,
          used_in_courses boolean default true,
          used_in_ebooks boolean default true,
          created_at timestamp with time zone default timezone('utc'::text, now()) not null,
          updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );

        -- Courses table
        create table if not exists public.courses (
          id uuid primary key default uuid_generate_v4(),
          title text not null,
          description text,
          thumbnail text,
          duration text,
          instructor text,
          rating float default 0,
          status text default 'draft',
          is_featured boolean default false,
          category_id uuid references public.categories,
          created_at timestamp with time zone default timezone('utc'::text, now()) not null,
          updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );

        -- Rest of the tables...
        -- (Previous SQL remains the same)
      `
    });

    if (tablesError) {
      console.error('Error creating tables:', tablesError);
      return;
    }

    console.log('Database setup completed successfully!');

  } catch (error) {
    console.error('Setup failed:', error);
  }
}

setupDatabase();