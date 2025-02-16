import { useForm } from "react-hook-form";
import { createArticle } from "../api/articles";
import { TextField, Button, Container } from "@mui/material";

const AddNew = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Function to handle form submission with a status parameter
  const onSubmit = async (data, status) => {
    const finalData = { ...data, status }; // Add status to form data
    await createArticle(finalData);
    alert(`Article created successfully as ${status}!`);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit((data) => onSubmit(data, "draft"))}>
        <TextField 
          fullWidth 
          label="Title" 
          {...register("title", { required: true, minLength: 20 })} 
          error={!!errors.title} 
          helperText={errors.title ? "Min 20 characters" : ""} 
          margin="normal" 
        />
        <TextField 
          fullWidth 
          multiline 
          rows={4} 
          label="Content" 
          {...register("content", { required: true, minLength: 200 })} 
          error={!!errors.content} 
          helperText={errors.content ? "Min 200 characters" : ""} 
          margin="normal" 
        />
        <TextField 
          fullWidth 
          label="Category" 
          {...register("category", { required: true, minLength: 3 })} 
          error={!!errors.category} 
          helperText={errors.category ? "Min 3 characters" : ""} 
          margin="normal" 
        />

        <Button 
          type="button" 
          variant="contained" 
          color="primary" 
          style={{ marginRight: "8px" }} 
          onClick={handleSubmit((data) => onSubmit(data, "draft"))}
        >
          Draft
        </Button>
        
        <Button 
          type="button" 
          variant="contained" 
          color="secondary" 
          onClick={handleSubmit((data) => onSubmit(data, "publish"))}
        >
          Publish
        </Button>
      </form>
    </Container>
  );
};

export default AddNew;