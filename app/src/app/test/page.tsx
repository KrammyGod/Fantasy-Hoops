"use client"
import BookmarkList from "@/components/BookmarkList";
import BookmarkBtn from "@/components/BookmarkBtn";
export default function TestPage() {
    return (
        <>
            <BookmarkList></BookmarkList>
            <BookmarkBtn pid={5} uid={1}></BookmarkBtn>
        </>
    );
}