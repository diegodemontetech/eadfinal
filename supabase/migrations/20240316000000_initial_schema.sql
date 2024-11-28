-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Drop existing tables if they exist
drop table if exists public.comments cascade;
drop table if exists public.news cascade;
drop table if exists public.ebook_progress cascade;
drop table if exists public.ebooks cascade;
drop table if exists public.certificates cascade;
drop table if exists public.lesson_progress cascade;
drop table if exists public.course_progress cascade;
drop table if exists public.quizzes cascade;
drop table if exists public.lessons cascade;
drop table if exists public.courses cascade;
drop table if exists public.users_groups cascade;
drop table if exists public.user_groups cascade;
drop table if exists public.categories cascade;
drop table if exists public.users cascade;

-- Create enum types
create type public.user_role as enum ('admin', 'instructor', 'user');
create type public.content_status as enum ('draft', 'published', 'archived');

-- Users and Authentication
create table public.users (
  id uuid references auth.users primary key,
  name text not null,
  email text unique not null,
  avatar_url text,
  role user_role default 'user'::user_role,
  total_hours float default 0,
  average_grade float default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.user_groups (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  permissions text[] not null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.users_groups (
  user_id uuid references public.users(id) on delete cascade,
  group_id uuid references public.user_groups(id) on delete cascade,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  primary key (user_id, group_id)
);

-- Categories
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text,
  is_active boolean default true,
  used_in_courses boolean default true,
  used_in_ebooks boolean default true,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Courses and Learning
create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  thumbnail text,
  duration text,
  instructor text,
  rating float default 0,
  status content_status default 'draft'::content_status,
  is_featured boolean default false,
  category_id uuid references public.categories(id) on delete set null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.lessons (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  description text,
  video_url text,
  duration text,
  order_index integer not null,
  attachments jsonb default '[]'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.quizzes (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid references public.lessons(id) on delete cascade unique,
  questions jsonb not null default '[]'::jsonb,
  passing_score integer default 70,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.course_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  progress float default 0,
  status text default 'not_started',
  grade float,
  started_at timestamptz default timezone('utc'::text, now()) not null,
  completed_at timestamptz,
  unique(user_id, course_id)
);

create table public.lesson_progress (
  id uuid primary key default uuid_generate_v4(),
  progress_id uuid references public.course_progress(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  completed boolean default false,
  watch_time float default 0,
  last_position float default 0,
  completed_at timestamptz,
  unique(progress_id, lesson_id)
);

create table public.certificates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  grade float not null,
  issued_at timestamptz default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

-- E-books
create table public.ebooks (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  author text not null,
  thumbnail text,
  file_url text not null,
  pages integer not null,
  read_time text not null,
  category_id uuid references public.categories(id) on delete set null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.ebook_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  ebook_id uuid references public.ebooks(id) on delete cascade,
  current_page integer default 0,
  completed boolean default false,
  started_at timestamptz default timezone('utc'::text, now()) not null,
  completed_at timestamptz,
  unique(user_id, ebook_id)
);

-- News and Blog
create table public.news (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  thumbnail text,
  category text not null,
  read_time text not null,
  is_highlighted boolean default false,
  status content_status default 'draft'::content_status,
  author_id uuid references public.users(id) on delete set null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  author_id uuid references public.users(id) on delete cascade,
  news_id uuid references public.news(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete set null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.user_groups enable row level security;
alter table public.users_groups enable row level security;
alter table public.categories enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.quizzes enable row level security;
alter table public.course_progress enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.certificates enable row level security;
alter table public.ebooks enable row level security;
alter table public.ebook_progress enable row level security;
alter table public.news enable row level security;
alter table public.comments enable row level security;

-- Create policies
create policy "Public read access"
  on public.categories for select
  using (true);

create policy "Admin full access"
  on public.categories for all
  using (auth.jwt() ->> 'role' = 'admin');

-- Repeat similar policies for other tables...

-- Create updated_at trigger function
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers
create trigger set_updated_at
  before update on public.users
  for each row
  execute function handle_updated_at();

-- Repeat for other tables with updated_at...

-- Insert initial data
insert into public.user_groups (name, permissions) values
  ('Administradores', '{all}'),
  ('Instrutores', '{courses.read,courses.write}'),
  ('Alunos', '{courses.read}');

insert into public.categories (name, description) values
  ('Gestão', 'Conteúdo sobre gestão pecuária'),
  ('Nutrição', 'Conteúdo sobre nutrição animal'),
  ('Sanidade', 'Conteúdo sobre sanidade animal');