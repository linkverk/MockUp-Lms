export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'normal' | 'suspicious' | 'fraud';
  fraudScore: number;
  failedTests: number;
  chargePoint: string;
  tests?: TestReport[];
}

export interface ChargePoint {
  id: string;
  location: string;
  fraudCases: number;
  totalTransactions: number;
  fraudPercentage?: number;
  recentTransactions?: Transaction[];
}

export interface TestReport {
  id: string;
  date: string;
  testName: string;
  flaggedData: string[];
  result: 'pass' | 'fail';
  fraudScore: number;
}

export interface DashboardStats {
  totalFraudCases: number;
  totalTransactions: number;
  fraudPercentage: number;
  mostFlaggedTests: { name: string; count: number }[];
  topFraudChargePoints: ChargePoint[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  totalTransactions: number;
  fraudCases: number;
  suspiciousCases: number;
  lastTransaction: string;
  riskScore: number;
}