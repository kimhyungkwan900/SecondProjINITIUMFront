const programRouter = [
    {
        path: "/programs",
        element: <ProgramListSection />,
    },
    {
        path: "/programs/:id",
        element: <ProgramDetailPage />,
    },
];

export default programRouter;