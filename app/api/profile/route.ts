import { NextResponse } from 'next/server';

export async function GET() {
    const profile = {
        name: 'Thanawat Daraneerat , Pumiphat Khotchanakhen',
        email: 'ttigggerd@gmail.com',
        id: '65111205 , 65106684' ,
        avatar: 'https://example.com/avatar.jpg',
        bio: 'Testing API route in Next.js',
    };
    return NextResponse.json({ profile });  // ไม่ต้อง { status: 200 } ถ้า default
}