// import { createClient } from '@supabase/supabase-js';
// import * as dotenv from 'dotenv';
//
// // Load environment variables
// dotenv.config();
//
// const supabaseUrl = 'supabase.co';
// const supabaseKey = "..цуйцуйцуйцуйуйцчсячсячс";
//
//
// console.log("🔍 SUPABASE_KEY:", process.env.DATABASE_URL);
//
// // Ensure the key is loaded
// if (!supabaseKey) {
//     console.error("❌ Missing SUPABASE_KEY. Check your .env file.");
//     process.exit(1);
// }
//
// // Initialize Supabase client
// const supabase = createClient(supabaseUrl, supabaseKey);
//
// async function testSupabase() {
//     console.log("🔄 Testing Supabase connection...");
//
//     // Step 1: Check if Supabase is reachable
//
//     console.log("✅ Supabase is reachable!");
//
//     // Step 2: Create `Note` Table (if not exists)
//
//
//     if (true) {
//         console.log("🔴 'Note' table does not exist. Creating...");
//         const { error: createTableError } = await supabase.rpc('sql', {
//             query: `
//         CREATE TABLE IF NOT EXISTS public.Note (
//           id SERIAL PRIMARY KEY,
//           title TEXT NOT NULL,
//           content TEXT NOT NULL
//         );
//       `
//         });
//
//         if (createTableError) {
//             console.error("❌ Error creating 'Note' table:", createTableError.message);
//             return;
//         }
//         console.log("✅ 'Note' table created successfully!");
//     } else {
//         console.log("✅ 'Note' table already exists!");
//     }
//
//     // Step 3: Insert Sample Data
//     console.log("📝 Inserting sample note...");
//     const { data: insertData, error: insertError } = await supabase
//         .from('Note')
//         .insert([{ title: 'My First Note', content: 'Hello from Supabase!' }]);
//
//     if (insertError) {
//         console.error("❌ Error inserting data:", insertError.message);
//     } else {
//         console.log("✅ Data inserted:", insertData);
//     }
//
//     // Step 4: Fetch Data
//     console.log("📜 Fetching notes...");
//     const { data, error } = await supabase.from('Note').select('*');
//
//     if (error) {
//         console.error("❌ Error fetching notes:", error.message);
//     } else {
//         console.log("✅ Notes fetched successfully:", data);
//     }
// }
//
// // Run the test function
// testSupabase();
