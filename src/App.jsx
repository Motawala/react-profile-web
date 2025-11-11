import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './components/ProfileCard.jsx';
import ProfileForm from "./components/ProfileForm.jsx"
import { profiles } from './data/profiles.js';
import { useState } from 'react';

export default function App() {
  const [people, setPeople] = useState(profiles);

  const handleLinkEvent = (id) => {
    setPeople((ps) =>
      ps.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  
  // Function call to add the profile to the people State.
  const addPerson = (name) => {
    let nextId = 0
    if (people.length > 0){
      nextId = parseInt(people.length) + 1
    } else {
      nextId = 1
    }
    const newPersonProfile = {
      id: nextId,
      name: name,
      likes: 0
    }
    setPeople([...people, newPersonProfile]);
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      <ProfileForm profiles={people} addName={addPerson}/>
      <Row xs={1} md={2} lg={3}>
        {people.map((p) => (
          <Col key={p.id}>
            <ProfileCard id={p.id} name={p.name} likes={p.likes} onClickLike={handleLinkEvent}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
