import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.03) 0%, transparent 50%)',
      }}
    >
      {/* Glass Card Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          borderRadius: '32px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Profile Circle */}
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '70px',
            background: 'linear-gradient(135deg, #333 0%, #111 100%)',
            border: '4px solid rgba(255,255,255,0.2)',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: '#fff',
          }}
        >
          JH
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '12px',
            letterSpacing: '-0.03em',
          }}
        >
          Julien Hoang
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '24px',
          }}
        >
          Investigator & Builder
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
          }}
        >
          {['OSINT', 'Detective', 'Author'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                fontSize: '18px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Domain */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          fontSize: '20px',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        julienhoang.com
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
