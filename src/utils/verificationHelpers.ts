import axios from 'axios';

// Type for verification result
export type VerificationResult = {
  success: boolean;
  message: string;
  error?: string;
};

// Type for verification parameters
export type VerificationParams = {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  verification_level: string;
};

/**
 * Send verification data to backend for World ID proof verification
 * @param verificationData The proof data received from World ID
 * @returns Promise with verification result
 */
export const verifyWorldID = async (
  verificationData: VerificationParams
): Promise<VerificationResult> => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/verify', 
      verificationData
    );
    
    return {
      success: response.data.success,
      message: response.data.message || 'Verification successful'
    };
  } catch (error) {
    console.error('Verification error:', error);
    
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: 'Verification failed',
        error: error.response.data.message || error.message
      };
    }
    
    return {
      success: false,
      message: 'Verification failed',
      error: 'Network error or server unavailable'
    };
  }
};

/**
 * Parse verification level to a human-readable format
 * @param level The verification level string from World ID
 * @returns Formatted verification level
 */
export const formatVerificationLevel = (level: string): string => {
  switch (level) {
    case 'orb':
      return 'Orb Verified (Highest security)';
    case 'device':
      return 'Device Verified';
    case 'phone':
      return 'Phone Verified';
    default:
      return level;
  }
};