export default function TopBanner() {
  return (
    <div className="px-4 md:px-6 pt-3 pb-[15px]">
      <div
        className="flex items-center justify-center text-center px-4"
        style={{
          backgroundColor: '#f1f0ed',
          borderRadius: '0.625rem',
          minHeight: '2.5rem',
          padding: '0.625rem 0.9375rem',
        }}
      >
        <p
          style={{
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: '0.875rem',
            color: '#67645e',
            margin: 0,
          }}
        >
          Free UK Shipping on Orders Over £45
        </p>
      </div>
    </div>
  );
}
