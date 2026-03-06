import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Type,
  Hash,
  Clock,
  Braces,
  ToggleLeft,
  Fingerprint,
  Binary,
  List,
  Sparkles,
} from "lucide-react";
import { categories, dataTypes } from "../_lib/data";
import { CategoryId } from "../_lib/types";
import { TypeDetail } from "../_components/type-detail";

const categoryIcons: Record<CategoryId, React.ElementType> = {
  text: Type,
  numeric: Hash,
  datetime: Clock,
  json: Braces,
  boolean: ToggleLeft,
  uuid: Fingerprint,
  binary: Binary,
  arrays: List,
  special: Sparkles,
};

const categoryMeta: Record<
  CategoryId,
  { title: string; description: string; keywords: string[] }
> = {
  text: {
    title: "PostgreSQL Text Types — text vs varchar vs char",
    description:
      "Compare PostgreSQL text types: text, varchar(n), and char(n). Storage, performance, and when to use each. Clear recommendations with SQL examples.",
    keywords: [
      "postgres text type",
      "varchar vs text postgres",
      "char vs varchar",
      "postgresql string types",
    ],
  },
  numeric: {
    title: "PostgreSQL Numeric Types — integer, bigint, numeric, float",
    description:
      "Compare PostgreSQL numeric types: smallint, integer, bigint, numeric, real, double precision. Storage sizes, ranges, and when to use each.",
    keywords: [
      "postgres integer types",
      "int vs bigint postgres",
      "numeric vs float postgres",
      "postgresql number types",
    ],
  },
  datetime: {
    title: "PostgreSQL Date/Time Types — timestamptz, date, interval",
    description:
      "Compare PostgreSQL date/time types: timestamptz, timestamp, date, time, interval. Why you should always use timestamptz.",
    keywords: [
      "postgres timestamp types",
      "timestamptz vs timestamp",
      "postgresql date types",
      "postgres interval",
    ],
  },
  json: {
    title: "PostgreSQL JSON Types — jsonb vs json",
    description:
      "Compare PostgreSQL JSON types: jsonb and json. Indexing, performance, and why jsonb is almost always the right choice.",
    keywords: [
      "jsonb vs json postgres",
      "postgresql json types",
      "postgres jsonb index",
      "postgres json performance",
    ],
  },
  boolean: {
    title: "PostgreSQL Boolean Type",
    description:
      "PostgreSQL boolean type: storage, usage, and why it's always the right choice for true/false values.",
    keywords: [
      "postgres boolean",
      "postgresql bool type",
      "postgres true false",
    ],
  },
  uuid: {
    title: "PostgreSQL UUID Type — gen_random_uuid()",
    description:
      "PostgreSQL uuid type: storage, performance vs text, and how to generate UUIDs with gen_random_uuid().",
    keywords: [
      "postgres uuid type",
      "gen_random_uuid",
      "postgresql uuid primary key",
      "postgres uuid vs text",
    ],
  },
  binary: {
    title: "PostgreSQL Binary Type — bytea",
    description:
      "PostgreSQL bytea type for binary data: storage, TOAST behavior, and when to use external storage instead.",
    keywords: [
      "postgres bytea",
      "postgresql binary type",
      "postgres blob",
      "postgres binary data",
    ],
  },
  arrays: {
    title: "PostgreSQL Array Types",
    description:
      "PostgreSQL array types: when to use arrays vs junction tables, GIN indexing, and practical SQL examples.",
    keywords: [
      "postgres array type",
      "postgresql arrays",
      "postgres array vs table",
      "postgres gin index array",
    ],
  },
  special: {
    title: "PostgreSQL Special Types — identity, serial, enum, inet, tsvector",
    description:
      "Compare PostgreSQL special types: identity vs serial, enums, inet/cidr, tsvector. Modern alternatives and migration guidance.",
    keywords: [
      "postgres serial vs identity",
      "postgresql enum type",
      "postgres inet type",
      "postgres tsvector",
    ],
  },
};

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Metadata | Promise<Metadata> {
  return params.then(({ category }) => {
    const meta = categoryMeta[category as CategoryId];
    if (!meta) return {};
    return {
      title: `${meta.title} | PostgresGUI`,
      description: meta.description,
      keywords: meta.keywords,
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: "website",
        url: `https://postgresgui.com/data-types/${category}`,
        siteName: "PostgresGUI",
      },
      twitter: {
        card: "summary_large_image",
        title: `${meta.title} | PostgresGUI`,
        description: meta.description,
      },
      alternates: {
        canonical: `https://postgresgui.com/data-types/${category}`,
      },
    };
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { category: categoryId } = await params;
  const { type: typeId } = await searchParams;
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    notFound();
  }

  const types = dataTypes.filter((t) => t.category === category.id);
  const Icon = categoryIcons[category.id];

  // Pick the selected type: from search param, or default to first
  const selectedType =
    (typeId && types.find((t) => t.id === typeId)) || types[0];

  if (!selectedType) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div
        className="flex items-center gap-4 pl-4 border-l-4"
        style={{ borderColor: category.color }}
      >
        <Icon
          className="w-6 h-6 shrink-0"
          style={{ color: category.color }}
        />
        <div>
          <h1 className="font-[family-name:var(--font-oswald)] text-xl sm:text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-stone-100">
            {category.name}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {category.tldr}
          </p>
        </div>
      </div>
      <TypeDetail type={selectedType} categoryColor={category.color} />
    </div>
  );
}
