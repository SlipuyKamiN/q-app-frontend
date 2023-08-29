import AddRecipeForm from 'components/AddRecipePage/AddResipeForm/AddRecipeForm';
import Container from 'components/Shared/Container';
import MainTitle from 'components/Shared/MainTitle';

const AddRecipePage = () => {
  return (
    <Container>
      <MainTitle title="Add recipe" />
      <AddRecipeForm />
    </Container>
  );
};

export default AddRecipePage;
