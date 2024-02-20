import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './globals.css'
import { Home } from './pages/home'

const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)
