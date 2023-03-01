import { PrescriptionDetails, IsReedemable } from '@components/Prescription';
import { Database } from '@lib/types/database.types';
import { getContract } from '@utils/contract';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import * as React from 'react';
import { SmartCription } from 'typechain-types';

const PrescriptionList = ({ prescriptions, onlyRedeemeds }: { prescriptions: Database['public']['Tables']['userToken']['Row'][], onlyRedeemeds: boolean }) => {
    const { active, account, library } = useWeb3React()

    const isRedeemable = (prescriptionId: number) => {
        if (active && account) {
            getContract().then((contract) => {
                (contract as SmartCription).balanceOf(account, prescriptionId).then((supply: BigNumber) => {
                    if (supply.toNumber() == 2) {
                        return false;
                    } else {
                        return true;
                    }
                })
            })
        }
        return true;
    }
    let noPrescriptions = true;

    return (
        <div className="prescriptionlist-preview" >
            { prescriptions.map((prescription) => {
                const redeemable = isRedeemable(prescription.prescriptionId);
                if ((onlyRedeemeds && !redeemable) || (!onlyRedeemeds && redeemable)) {
                    return <></>;
                }
                noPrescriptions = false;
                return (
                <div className="prescription-preview" key={prescription.prescriptionId}>
                    <h2>Prescription #{ prescription.prescriptionId }</h2>
                    <PrescriptionDetails hash={prescription.prescriptionHash}/>
                    <IsReedemable id={prescription.prescriptionId} />
                </div>
            )
            }) }
            { noPrescriptions && `No prescriptions ${onlyRedeemeds ? 'redeemed' : 'redeemable'} yet.` }
        </div>
    )
}

export default PrescriptionList;
