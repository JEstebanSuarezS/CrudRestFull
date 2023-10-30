import { BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from "./Home"
import Articles from "./Articles"
import User from "./crudUsers/User"
import PutUser from "./crudUsers/PutUser"
import ArticlesCrud from "./crudArticles/CreateArticles"
import PutArticles from "./crudArticles/ArticlesPut"
import Categories from "./Categories"
import CategoriesCrud from "./crudCategories/CreateCategories"
import PutCategories from "./crudCategories/PutCategories"

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/articles' element={<Articles />}/>
          <Route path='/createUser' element={<User />}/>
          <Route path='/createArticle' element={<ArticlesCrud />}/>
          <Route path='/putUser/:id' element={<PutUser />}/>
          <Route path='/putArticles/:id' element={<PutArticles />}/>
          <Route path='/categories' element={<Categories />}/>
          <Route path='/createCategories' element={<CategoriesCrud />}/>
          <Route path='/putCategories/:id' element={<PutCategories />}/>
        </Routes>
      </Router>
  )
}