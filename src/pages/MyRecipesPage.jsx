import ItemNotCocktails from 'components/FavoritePage/ItemNotCocktails';
import Paginator from 'components/FavoritePage/Paginator';
import RecipesList from 'components/FavoritePage/RecipesList';
import LoadingSpinner from 'components/Shared/LoadingSpinner';
import Container from 'components/Shared/Container';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  useGetMyRecipesQuery,
  useDeleteMyRecipeMutation,
} from 'redux/myRecipesSlice';
import scss from './FavoritePage.module.scss';
import MainTitle from 'components/Shared/MainTitle';

const MyRecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowDimensions();
  const limit = width >= 1440 ? 9 : 8;
  const { data, isLoading, isError, refetch } = useGetMyRecipesQuery(
    `?page=${searchParams.get('page')}&limit=${limit}`
  );
  const [deleteMyRecipe] = useDeleteMyRecipeMutation();
  const pagesQty = Math.ceil(data?.totalHits / limit);
  const title = 'My recipes';
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: 1 });
      return;
    }
  }, [searchParams, setSearchParams]);

  if (isLoading) return <LoadingSpinner />;
  if (isError && !data) return navigate('/404Page');

  const handleDeleteRecipes = id => {
    deleteMyRecipe(id)
      .unwrap()
      .then(() => {
        refetch();
        if (pagesQty === 1) return;

        if (data.length === 1) {
          setSearchParams({ page: pagesQty - 1 });
        }
      });
  };
  console.log('data', data);
  console.log('pagesQty', pagesQty);
  return (
    <section className={scss.wraper}>
      <Container>
        <MainTitle title={title} style={{ padding: '0' }} />
        {data?.totalHits && !isError ? (
          <>
            <RecipesList data={data} removeResipes={handleDeleteRecipes} />
            <Paginator pagesQty={pagesQty} />
          </>
        ) : (
          <ItemNotCocktails title={"You haven't created any recipes yet"} />
        )}
      </Container>
    </section>
  );
};

export default MyRecipesPage;