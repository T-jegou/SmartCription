import Content from "@components/Content"
import Navbar from "@components/Navbar"
import { Container } from "@mantine/core"

const Index = () => {
    
    return (
        <div>
            <Navbar/>
            <Container>
                <Content/>
            </Container>
        </div>
    )
}

export default Index