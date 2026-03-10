// ============================================================================
// WEB VITALS REPORTING
// ============================================================================
// Reports Core Web Vitals metrics to help monitor application performance
// - CLS: Cumulative Layout Shift (visual stability)
// - INP: Interaction to Next Paint (responsiveness)
// - FCP: First Contentful Paint (visual completeness)
// - LCP: Largest Contentful Paint (loading performance)
// - TTFB: Time to First Byte (server response time)

/**
 * Initializes collection and reporting of Web Vitals metrics
 * @param onPerfEntry - Optional callback function to receive performance entries
 * @example
 * reportWebVitals(console.log) // Logs metrics to console
 * reportWebVitals() // Just collects metrics silently
 */
const reportWebVitals = (onPerfEntry?: () => void) => {
  // Only proceed if a callback function is provided
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals library (only when needed)
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Register callback for each vital metric
      onCLS(onPerfEntry)
      onINP(onPerfEntry)
      onFCP(onPerfEntry)
      onLCP(onPerfEntry)
      onTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
