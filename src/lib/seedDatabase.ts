import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vrbdlyfkzelfuruelams.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyYmRseWZremVsZnVydWVsYW1zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjgwNTE0MiwiZXhwIjoyMDQ4MzgxMTQyfQ.QSefavWla4N0wZpEW6sTfNRIQb8T2wV983ywslGjGpw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  try {
    // Create initial user groups
    const { data: groups, error: groupsError } = await supabase
      .from('user_groups')
      .insert([
        {
          name: 'Administradores',
          permissions: ['all']
        },
        {
          name: 'Instrutores',
          permissions: ['courses.read', 'courses.write']
        },
        {
          name: 'Alunos',
          permissions: ['courses.read']
        }
      ])
      .select();

    if (groupsError) throw groupsError;
    console.log('User groups created:', groups);

    // Create initial categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .insert([
        {
          name: 'Gestão',
          description: 'Conteúdo sobre gestão pecuária',
          is_active: true,
          used_in_courses: true,
          used_in_ebooks: true
        },
        {
          name: 'Nutrição',
          description: 'Conteúdo sobre nutrição animal',
          is_active: true,
          used_in_courses: true,
          used_in_ebooks: true
        },
        {
          name: 'Sanidade',
          description: 'Conteúdo sobre sanidade animal',
          is_active: true,
          used_in_courses: true,
          used_in_ebooks: true
        }
      ])
      .select();

    if (categoriesError) throw categoriesError;
    console.log('Categories created:', categories);

    // Create test admin user
    const { data: adminUser, error: adminError } = await supabase.auth.signUp({
      email: 'admin@vpj.com',
      password: 'admin123',
      options: {
        data: {
          name: 'Admin',
          role: 'admin'
        }
      }
    });

    if (adminError) throw adminError;
    console.log('Admin user created:', adminUser);

    // Create test instructor
    const { data: instructor, error: instructorError } = await supabase.auth.signUp({
      email: 'instructor@vpj.com',
      password: 'instructor123',
      options: {
        data: {
          name: 'Dr. João Silva',
          role: 'instructor'
        }
      }
    });

    if (instructorError) throw instructorError;
    console.log('Instructor created:', instructor);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

seedDatabase();