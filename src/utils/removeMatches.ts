const removeMatches = ({ line, nbRemove }: { line: string; nbRemove: number }): string => {
    const matchesToReplace = "\\|".repeat(nbRemove);
    const regex = new RegExp(matchesToReplace);
    return line.replace(regex, "");
};

export default removeMatches;
