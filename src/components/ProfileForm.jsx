import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function ProfileForm({profiles, addName}){
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        // Retreive the name
        const trimmedName = name.trim()
        // Condition to check if the name exists.
        const nameAlreadyExists = profiles.some(
            (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
        );
        
        // Check if the name already exists then set the error message
        if (nameAlreadyExists) {
            setError("Name Already Exists. Please use a different name")
            return;
        }
        
        // If the name submitted is empty, set the error message.
        if (trimmedName === ''){
            setError("Name Field is required. Enter the Name.")
            return;
        }
        
        // If No error Add the name to the
        addName(trimmedName)
        // If Submit Successfull Reset the Name field and the Error Field
        setName('')
        setError('')
    }



    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control className="mb-3" 
                    type="text" 
                    placeholder="Enter Name" 
                    value={name}
                    onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(''); // reset error on typing
                    }}
                    isInvalid={!!error}
                />
                <Button variant="success" type="submit">
                Submit
                </Button>
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
  );
}