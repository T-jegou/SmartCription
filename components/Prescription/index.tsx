import { Prescription } from "@lib/types/prescription"
import { Button, Group, Input, Modal } from "@mantine/core"
import { getContract } from "@utils/contract"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "ethers"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { SmartCription } from "typechain-types"

export const PrescriptionDetails = ({hash}: {hash: string}) => {
    const [prescription, setPrescription] = React.useState<Prescription>()
    React.useEffect(() => {
        // fetch(`https://gateway.pinata.cloud/ipfs/${hash}`)
        //     .then(res => res.json())
        //     .then((data: Prescription) => {
        //         setPrescription(data)
        //     })
    }, [hash])
    if (prescription) {
        return (
            <div>
                <h2>{ prescription.medication }</h2>
                <p>{ prescription.date }</p>
                <p>{ prescription.instructions }</p>
            </div>
        )
    } else {
        return null
    }
}

type FormValues = {
    pharmacistAddress: string
}

export const IsReedemable = ({id}: {id: number}) => {
    const [isRedeemable, setIsRedeemable] = React.useState<boolean>(false)
    const [opened, setOpened] = React.useState(false);
    const [redeemed, setRedeemed] = React.useState<boolean>(false)
    const { active, account, library } = useWeb3React()
    
    React.useEffect(() => {
        if (active && account) {
            getContract().then((contract) => {
                (contract as SmartCription).balanceOf(account, id).then((supply: BigNumber) => {
                    if (supply.toNumber() == 2) {
                        setIsRedeemable(true)
                    } else {
                        setIsRedeemable(false)
                    }
                })
            })
        }
        else {
            alert("Please connect your wallet")
        }
    }, [id, redeemed])

    const { register, handleSubmit } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const { pharmacistAddress } = data;
        const contract = await getContract(library.getSigner()) as SmartCription
        const tx = await contract.claim(pharmacistAddress, id, 1)
        const receipt = await tx.wait()
        const claimedId: BigNumber = receipt.events?.find(event => event.event === 'PrescriptionClaimed')?.args?.id
        setRedeemed(true)
        window.location.reload()
    }
    return (
        <>
            <Button disabled={!isRedeemable} onClick={() => setOpened(true)}>{isRedeemable ? 'Redeem' : 'Redeemed'}</Button>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Are you sure you want to redeem this prescription?"
            >
                <p>Once redeemed, the prescription cannot be redeemed again, make sure you are ready to redeem it with your pharmacist.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="pharmacistAddress">Pharmacist Address</label>
                    <Input type="text" {...register("pharmacistAddress")} />
                
                    <Group mt="xl">
                        <Button variant="outline" type="submit" bg="green">
                            Confirm
                        </Button>
                        <Button variant="outline" bg="red" onClick={() => setOpened(false)}>
                            Cancel
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    )
}

