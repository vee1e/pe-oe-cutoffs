# Contributing to Elective Cutoffs

Thank you for your interest in contributing to Elective Cutoffs! This document outlines the process for contributing to this project.

## Code of Conduct

By participating in this project, you are expected to:
- Be respectful and inclusive of others
- Use welcoming and inclusive language
- Be accepting of different viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community

## How Can I Contribute?

### Reporting Bugs

1. Check if the bug has already been reported in the Issues section
2. If not, create a new issue with:
   - A clear, descriptive title
   - Steps to reproduce the bug
   - Expected behavior vs actual behavior
   - Screenshots if applicable
   - Browser/OS information

### Suggesting Features

1. Check if the feature has already been requested
2. Create a new issue with:
   - A clear, descriptive title
   - Detailed description of the proposed feature
   - Explanation of why this would be useful
   - Any relevant examples or mockups

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Ensure code quality:
   ```bash
   bun lint
   bun build
   ```
5. Commit your changes with a clear message
6. Push to your fork and create a Pull Request

## Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/elective-cutoffs.git
   cd elective-cutoffs
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Install dependencies:
   ```bash
   bun install
   ```
5. Start the development server:
   ```bash
   bun dev
   ```

## Coding Conventions

### TypeScript

- Use TypeScript for all new code
- Avoid `any` type - use proper types or `unknown`
- Use interfaces for object types
- Enable strict mode in tsconfig.json

### Components

- Use functional components with hooks
- Follow the existing component structure in `components/`
- Use shadcn/ui components from `components/ui/`
- Keep components small and focused
- Use TypeScript interfaces for props

### Styling

- Use Tailwind CSS classes
- Follow the color scheme and design patterns in the app
- Avoid custom CSS when Tailwind can achieve the same result
- Use the `cn()` utility from `lib/utils.ts` for conditional classes

### Git Commits

- Use conventional commit messages:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code restructuring
  - `chore:` for maintenance tasks

Example:
```
feat: add filter by department functionality
fix: resolve sorting issue with cutoff values
docs: update README with deployment instructions
```

## Adding New Electives

When adding new elective courses:

1. Add the course to `data/elective_cutoffs.csv` with the format:
   ```
   Elective Type,Course Name,Lowest CGPA (Cutoff),Highest CGPA,Number of Students
   ```

2. Update `lib/electives.ts`:
   - Add a new entry to the `electiveData` array
   - Use the `parseCourseName()` helper function
   - Follow the existing pattern for the entry format

3. Test the changes:
   - Verify the course appears in the correct category
   - Check filtering and sorting work correctly
   - Ensure the dashboard statistics update properly

## Testing

Before submitting a PR, ensure:
- The application builds without errors: `bun build`
- ESLint passes: `bun lint`
- All existing features still work
- Your new feature works as expected

## Questions?

If you have questions, feel free to open an issue for discussion.
