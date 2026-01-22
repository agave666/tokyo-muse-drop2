export interface PaymentService {
  purchaseExtraMoves(): Promise<boolean>;
  purchaseExtraPlays(): Promise<boolean>;
  isAvailable(): boolean;
}

class MockPaymentService implements PaymentService {
  async purchaseExtraMoves(): Promise<boolean> {
    // Placeholder - will be replaced with Orynth integration
    console.log('[PaymentService] Purchase extra moves - not implemented');
    return false;
  }

  async purchaseExtraPlays(): Promise<boolean> {
    // Placeholder - will be replaced with Orynth integration
    console.log('[PaymentService] Purchase extra plays - not implemented');
    return false;
  }

  isAvailable(): boolean {
    return false; // Not available in prototype
  }
}

export const paymentService: PaymentService = new MockPaymentService();
