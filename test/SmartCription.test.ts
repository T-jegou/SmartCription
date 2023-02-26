import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"
import { ethers } from "hardhat"
import { SmartCription } from "../typechain-types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"
import { userPrescription, getUserPrescription, deleteUserPrescription} from "../lib/backend"


describe("SmartCription", () => {

    let smartCription: SmartCription

    let owner: SignerWithAddress, patient1: SignerWithAddress, medic1: SignerWithAddress, pharma1: SignerWithAddress

    beforeEach(async () => {
        [owner, patient1, medic1, pharma1] = await ethers.getSigners()

        const SmartCription = await ethers.getContractFactory("SmartCription")
        smartCription = await SmartCription.deploy()
        await smartCription.deployed()
        await smartCription.grantRole(await smartCription.MEDIC_ROLE(), medic1.address)
    })

    const grantPharmaAndCheck = async () => {
        await smartCription.grantRole(await smartCription.PHARMACIST_ROLE(), pharma1.address)
        expect(await smartCription.hasRole(await smartCription.PHARMACIST_ROLE(), pharma1.address)).to.be.true
    }

    it("Should deploy", async () => {
        expect(smartCription.address).to.properAddress
    })

    describe("Pause", () => {
        it("Can be paused", async () => {
            await smartCription.pause()
            expect(await smartCription.paused()).to.be.true
        })

        it("Can be unpaused", async () => {
            await smartCription.pause()
            await smartCription.unpause()
            expect(await smartCription.paused()).to.be.false
        })

        it("Can be paused only by the admin", async () => {
            await expect(smartCription.connect(patient1).pause()).to.be.reverted
        })
    })

    describe("Roles", () => {
        it("Should have the admin role", async () => {
            expect(await smartCription.hasRole(await smartCription.DEFAULT_ADMIN_ROLE(), owner.address)).to.be.true
        })

        it("Should have the medic role", async () => {
            expect(await smartCription.hasRole(await smartCription.MEDIC_ROLE(), medic1.address)).to.be.true
        })

        it("Should be able to grant the pharma role", async () => {
            await grantPharmaAndCheck()
        })
    })

    describe("Prescriptions", () => {
        it("Shoulnd't be able to mint a prescription if not a medic", async () => {
            await expect(smartCription.connect(patient1).mint(patient1.address, 2, "0x00"))
                .to.be.reverted
        })

        it("Should be able to mint a prescription only as a medic", async () => {
            const tx = await smartCription.connect(medic1).mint(patient1.address, 2, "0x00")
            const id: BigNumber = (await tx.wait()).events?.find(event => event.event === 'PrescriptionMinted')?.args?.id
            await userPrescription(id.toString(),patient1.address)
            await expect(await smartCription.balanceOf(patient1.address, id)).to.equal(2)
        })
    })

    describe("Claims", () => {
        it("Should be able to claim a prescription", async () => {
            await grantPharmaAndCheck()
            const tx = await smartCription.connect(medic1).mint(patient1.address, 2, "0x00")
            const id: BigNumber = (await tx.wait()).events?.find(event => event.event === 'PrescriptionMinted')?.args?.id
            await smartCription.connect(patient1).claim(pharma1.address, id, 1)
            await expect(await smartCription.balanceOf(patient1.address, id)).to.equal(1)
            await expect(await smartCription.balanceOf(pharma1.address, id)).to.equal(1)
        })
    })

})