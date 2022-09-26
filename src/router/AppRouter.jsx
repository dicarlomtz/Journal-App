import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { authenticationStatuses} from "../store/auth/authSlice"
import { CheckingAuth } from "../ui"

export const AppRouter = () => {

  const { status } = useCheckAuth();

  if (status === authenticationStatuses.checking) return <CheckingAuth />;

  return (
    <Routes>
      {
        (status === authenticationStatuses.authenticated)
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }
      <Route path='/*' element={ <Navigate to='/auth/login'/>} />
    </Routes>
  )
}
