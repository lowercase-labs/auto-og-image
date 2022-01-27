import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://biyybzfraybtulcsnces.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwODU1OSwiZXhwIjoxOTU4ODg0NTU5fQ.QFbUzy5nguQ92eOMBBFPgZ7_4uH-gRDrANEClU4uvHo';
export const supabase = createClient(supabaseUrl, supabaseKey);