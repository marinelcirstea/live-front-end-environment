function Loading() {
  return (
    <div className="loading">
      <h2>Loading...</h2>
      <style jsx>{`
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default Loading;
