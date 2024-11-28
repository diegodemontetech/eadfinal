```typescript
import express from 'express';
import cors from 'cors';
import settingsRoutes from './routes/settings';
import coursesRoutes from './routes/courses';
import usersRoutes from './routes/users';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/settings', settingsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```