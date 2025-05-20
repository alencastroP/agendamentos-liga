import styled from 'styled-components';

const FooterContainer = styled.header`
    background-color:rgb(226, 226, 226);
    width: 100%;
    height: 70px;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0.5rem 2rem;
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2);
    display: flex;
`;
const LigaIco = styled.img`
    width: 120px;
    padding: 5px;
    margin: 0 20% 0 6%;
`;
const TextContainer = styled.nav`
    max-width: 1400px;
    justify-content: space-between;
    display: flex;
    align-items: center;
    flex-direction: row;
`

const FooterText = styled.p`
    color:rgb(83, 83, 83);
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    text-align: center;
    font-size: 10px;
`;

function Footer() {
    return (
        <>
            <FooterContainer>
                <TextContainer>
                    <LigaIco
                        src="https://c5gwmsmjx1.execute-api.us-east-1.amazonaws.com/prod/empresa/logo/36293/Logo_transp.png"
                        //src="https://ligacontraocancer.com.br/wp-content/themes/v01/assets/img/build/logo-liga-contra-o-cancer-negativo.3c2a15af.png"
                        alt="Liga Contra o Câncer"
                    />
                    <FooterText>A Liga Contra o Câncer é uma instituição empenhada no tratamento e prevenção do câncer, além de ser referência na produção de conhecimento, ensino e formação profissional na área da oncologia. Atualmente possui quatro unidades integradas, nas cidades de Natal e Caicó (Rio Grande do Norte), oferecendo assistência médica, diagnóstico e tratamento especializado, reabilitação e cuidados paliativos.</FooterText>
                </TextContainer>
            </FooterContainer>
        </>
    );
}

export default Footer;
