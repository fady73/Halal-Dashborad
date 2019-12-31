import { PaymentViewModel } from '../payment/payment.model';
import { SurveillanceStatus } from './surveillance-status.enum';

export class SurveillanceDecisionCommitteCreateViewModel {
    ID: number;
    RequestID: number;
    Status: SurveillanceStatus;
    Reason: string;
}

