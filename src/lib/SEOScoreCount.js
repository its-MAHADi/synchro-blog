const seoScore = (title , description , featured_image , tags) => {
    let score = 0;

    if(title && title.length > 10 && title < 30){
        score += 10;
    }

    if(description){
        score += 10;
    }

    if(description.length >= 120 && description <= 160){
        score += 20;
    }

    if(featured_image){
        score += 15;
    }

    if (description?.includes("http")){
        score += 5;
    }

    if (tags) {
        const tags = tags.split(",").map((t) => t.trim().toLowerCase());
        if (tags.length >= 3) score += 20;

        const titleToLower = title?.toLowerCase() || "";
        const desc = description?.toLowerCase() || "";

        if (tags.some((tag) => titleToLower.includes(tag) || desc.includes(tag))) {
            score += 20;
        }
    }

    // returning the score in percentage
    return Math.min((score*10)/100);

}