export interface Category {
    name: string;
    slug: string
}

export interface Author {
    bio: string;
    id: string;
    name: string;
    photo: {url: string};
    posts: Category[][];
}

export interface ContentSlice {
    type: string;
    children: {text:string}[]
}

export interface Post {
    author: Author;
    createdAt: string;
    excerpt: string;
    featuredImage: {url: string};
    slug: string;
    title: string;
    content: {raw: {children: ContentSlice[]}}
    categories?: Category[]
}


export interface GraphQLPost {
    posts: Post[]
}


export interface PostWidgetProp {
    slug?: string;
    categories?: string[]
}


export interface PostProps {
    post: Post
}


export interface ContentFragment {
    index: number;
    text: string;
    obj?: {}
    type: string;
}

export interface CommentsFormProps {
    slug: string
}

export interface CommentsProps {
    slug: string
}


export interface AuthroProps {
    author: {
        name: string;
        bio: string;
        photo: {
        url: string
        }
    }
}