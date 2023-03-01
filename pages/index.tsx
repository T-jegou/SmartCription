import Content from "@components/Content"
import Navbar from "@components/Navbar"
import { Container } from "@mantine/core"
import { useWeb3React } from "@web3-react/core"

const Index = () => {
    const { active, account } = useWeb3React()

    if (active && account) {
        return (
            <div className="application">
                <Navbar/>
                <Container>
                    <Content/>
                </Container>
            </div>
        )
    }
    return (
        <div className="login">
            <Content/>
        </div>
    )
}

export default Index