export enum ConsumerRequiredAction{
        None = 0,
        UploadPayment1 = 2,
        UploadDocuments = 3,
        CompleteDocuments = 4,
        UploadSignedAgreement = 5,
        WaitingPayment1Approval = 6,
        WaitingAgreementApproval = 7,
        UploadPayment2 = 8,
        WaitingPayment2Approval = 9,
}