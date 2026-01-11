# Elective Cutoffs

A web application for browsing and filtering elective course cutoffs (CGPA requirements) for MIT Manipal students for the dataset from the Academic Year 2025-2026. This tool helps students make informed decisions when selecting open electives (OE), program electives I (PE I), and program electives II (PE II).

## Features

- **Browse Electives**: View all available electives across different categories
- **Filter by Type**: Separate views for Open Electives, PE I, and PE II
- **Filter by Department**: Filter electives by offering department
- **Search**: Search by course code, name, or department
- **Sort Options**: Sort by name, cutoff (CGPA), number of students, or difficulty
- **Statistics Dashboard**: Overview of cutoff ranges and available courses

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI and Base UI)
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd elective-cutoffs
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `bun dev` - Start the development server
- `bun build` - Build for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint

## Project Structure

```
elective-cutoffs/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main dashboard page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── elective-dashboard.tsx  # Main dashboard component
│   ├── example.tsx              # Component examples
│   └── ui/                      # shadcn/ui components
├── data/
│   └── elective_cutoffs.csv     # Raw elective data
├── lib/
│   ├── electives.ts        # Elective data & utilities
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## Data Format

Elective data is sourced from `data/elective_cutoffs.csv`. The CSV format is:

```csv
Elective Type,Course Name,Lowest CGPA (Cutoff),Highest CGPA,Number of Students
Open Elective (OE),COURSE CODE : Course Name,6.75,8.98,70
```

After updating the CSV, regenerate the data in `lib/electives.ts` by running:

```bash
bun run scripts/generate-data
```

Or manually parse the CSV using the existing `parseCourseName` function pattern.

## Customization

### Adding New Electives

1. Add the new course to `data/elective_cutoffs.csv`
2. Update `lib/electives.ts` by adding a new entry to `electiveData` array
3. The course will automatically appear in the dashboard

### UI Components

This project uses shadcn/ui for components. To add a new component:

```bash
bunx shadcn@latest add <component-name>
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy

### Other Platforms

For other hosting platforms, build the production version:

```bash
bun build
bun start
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is for educational purposes. The elective data is sourced from institutional records.

## Authors

- [Lakshit Verma](https://lverma.com)
- [Aadit Agrawal](https://aadit.cc)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
