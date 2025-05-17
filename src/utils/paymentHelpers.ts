// No imports needed for payment helpers

type TokenType = 'USDC' | 'ETH' | 'WLD';
interface PaymentInput {
  amount: number;
  recipientAddress: string;
  description: string;
  token: TokenType;
}

// Helper function to format token amounts with correct decimals
const formatAmount = (amount: number, token: TokenType) => {
  const decimals = {
    USDC: 6,
    ETH: 18,
    WLD: 18
  };
  return (amount * Math.pow(10, decimals[token])).toString();
};

// Function to initiate payment with the backend
async function initiatePayment(paymentDetails: PaymentInput) {
  const res = await fetch('/api/initiate-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentDetails)
  });
  
  if (!res.ok) {
    throw new Error('Error al iniciar el pago');
  }
  
  const { id } = await res.json();
  return id;
}

// Main payment function using World ID API
export const processWorldAppPayment = async ({
  amount,
  recipientAddress,
  description,
  token = 'USDC'
}: PaymentInput) => {
  try {
    // Get payment ID from backend
    const paymentId = await initiatePayment({
      amount,
      recipientAddress,
      description,
      token
    });

    // Create World ID payment URL with deep link
    const paymentUrl = `https://id.worldcoin.org/pay?` + new URLSearchParams({
      amount: formatAmount(amount, token),
      token,
      to: recipientAddress,
      description: encodeURIComponent(description),
      reference: paymentId
    });

    // Open payment URL in new window
    window.open(paymentUrl, '_blank');

    // Return the payment ID for tracking
    return paymentId;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};
