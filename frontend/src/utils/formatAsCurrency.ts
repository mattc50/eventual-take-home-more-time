export const formatAsCurrency = (value) => (
  value.toLocaleString(
    'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  )
)