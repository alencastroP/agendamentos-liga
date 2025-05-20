import styled from 'styled-components';

const FeatureItem = styled.div`
  border-radius: 16px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 20px rgba(255, 51, 102, 0.18);
  transition: box-shadow 0.3s ease;
  text-align: center;
  min-width: 250px;
  max-width: 400px;
  background-color: white;
  position: relative;
  &:hover,
  &:focus-within {
      box-shadow: 0 8px 28px rgba(247, 32, 86, 0.35);
      outline: none;
      }
`;

const FeatureIcon = styled.img`
  height: 56px;
  margin-bottom: 1rem;
  width: 56px;
  fill:rgb(255, 51, 119);
  user-select: none;
`;

const FeatureTitle = styled.h3`
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #222;
`;

const FeatureDescription = styled.p`
  font-weight: 400;
  color: #555;
  font-size: 1rem;
`;

function Features({ title, description, img }) {
  return (
    <FeatureItem>
      <FeatureIcon src={img} viewBox="0 0 24 24">
      </FeatureIcon>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </FeatureItem>
  );
}

export default Features;
