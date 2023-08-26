import { nanoid } from '@reduxjs/toolkit';
import RecipeDescriptionFields from '././ComponentForm/RecipeDescriptionFields';
import RecipeIngredientsFields from '././ComponentForm/RecipeIngredientsFields';
import RecipePreparationFields from '././ComponentForm/RecipePreparationFields';
import scss from './AddRecipeForm.module.scss';
import { useState } from 'react';

const AddRecipeForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [drink, setDrink] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [glass, setGlass] = useState('');
  const [ingredients, setIngredients] = useState([
    { id: nanoid(), ingredient: '', amount: '', measurement: '' },
  ]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState([]);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleDrinkChange = event => setDrink(event.target.value);
  const handleDescriptionChange = event => setDescription(event.target.value);
  const handleCategoryChange = event => setCategory(event.value);
  const handleGlassChange = event => setGlass(event.value);

  const handleIngredientsChange = (idToUpdate, field, value) => {
    setIngredients(() =>
      ingredients.map(item => {
        if (item.id === idToUpdate) {
          item[field] = value;
        }
        return item;
      })
    );
  };

  const handleTextareaChange = event => {
    const text = event.target.value;
    const lines = text.split('\n');
    setInstructions(lines);
  };

  const addIngredient = () => {
    setQuantity(prev => prev + 1);

    setIngredients(prev => [
      ...prev,
      { id: nanoid(), ingredient: '', amount: '', measurement: '' },
    ]);
  };

  const removeIngredient = idToRemove => {
    setIngredients(prev => prev.filter(({ id }) => id !== idToRemove));
  };

  const reductionIngredient = () => {
    if (quantity === 1) {
      return alert('Must have at leastone ingredient');
    }
    setQuantity(prev => prev - 1);
    setIngredients(prev => prev.slice(0, prev.length - 1));
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);

    instructions.map();
  };
  return (
    <form className={scss.form} onSubmit={handleFormSubmit} action="">
      <RecipeDescriptionFields
        handleInputChange={{
          handleFileChange,
          handleDrinkChange,
          handleCategoryChange,
          handleDescriptionChange,
          handleGlassChange,
        }}
        value={{ selectedImage, drink, description, category, glass }}
      />
      <br />
      <br />
      <RecipeIngredientsFields
        ingredients={ingredients}
        quantity={quantity}
        setIngredients={setIngredients}
        handleIngredientsChange={handleIngredientsChange}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        reductionIngredient={reductionIngredient}
      />
      <br />
      <br />
      <RecipePreparationFields handleTextareaChange={handleTextareaChange} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddRecipeForm;
