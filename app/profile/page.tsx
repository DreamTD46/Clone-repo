import { serverFetch } from '@/lib/server-fetch';  // ถ้าไม่มี lib ดูสเต็ป 4

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getProfile() {
    try {
        const res = await serverFetch('/api/profile');
        console.log('Response OK?', res.ok, 'Status:', res.status);  // Debug ใน terminal
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        const jsonData = await res.json();
        console.log('Fetched JSON:', jsonData);  // Debug: ดูข้อมูลจริง
        return { profile: jsonData.profile || jsonData || {} };  // Fallback ถ้า API return { name: ... } โดยตรง
    } catch (error) {
        console.error('getProfile error:', error);
        return { error: typeof error === 'object' && error !== null && 'message' in error ? (error as { message: string }).message : String(error) };
    }
}

export default async function Profile() {
    const data = await getProfile();
    return (
        <section>
            <h1>Profile Page</h1>
            {'error' in data ? (
                <p style={{ color: '#c00' }}>Error: {data.error}</p>
            ) : (
                <>
                    {/* Debug: แสดง raw data ชั่วคราว (ลบได้หลัง fix)
                    <details style={{ marginBottom: 12 }}>
                        <summary>Debug Raw Data (click to see)</summary>
                        <pre style={{ background: '#f5f5f5', padding: 8, fontSize: '12px', margin: 0 }}>
                            {JSON.stringify(data.profile, null, 2)}
                        </pre>
                    </details> */}
                    <div className="card">
                        <h3>User Profile</h3>
                        <p><b>Name:</b> {data.profile.name || 'N/A'}</p>  {/* ลบ ?. ถ้าแน่ใจมี data */}
                        <p><b>Id:</b> {data.profile.id || 'N/A'}</p>
                        <p><b>Email:</b> {data.profile.email || 'N/A'}</p>
                        <p><b>Bio:</b> {data.profile.bio || 'N/A'}</p>  {/* เพิ่มเพื่อ test */}
                    </div>
                </>
            )}
            <p style={{ marginTop: 12, color: '#666' }}>
                This page fetches data from <code>/api/profile</code> on the server.
            </p>
        </section>
    );
}