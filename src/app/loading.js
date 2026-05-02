export default function Loading() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', background: 'var(--color-background-tertiary)',
    }}>
      <div style={{
        width: '40px', height: '40px', border: '3px solid var(--color-border-tertiary)',
        borderTop: '3px solid #b5651d', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}