'use server'
import { cookies } from "next/headers";

const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;
// Get User Token
async function getCookieStore() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken").value;
    return userToken;
}

// Get Menu
export async function getTeamMembers() {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/team`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        next: {
            cache: "no-store",
        },
    });
    const data = await response.json();
    return data;
}

// Update Team Member
export async function updateTeamMember(member) {
    const userToken = await getCookieStore();
    let formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('name', member.name);
    formData.append('role', member.role);
    formData.append('hire_date', member.hire_date);
    formData.append('salary', member.salary);
    formData.append('email', member.email);
    formData.append('image', member.image);
    formData.append('bio', member.bio);
    formData.append('is_active', member.is_active);
    formData.append('updated_at', new Date().toISOString());
    const response = await fetch(`${adminApiUrl}/team/${member.id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        body: formData,
        cache: "no-store",
    });
    const data = await response.json();
    return data;
}

// Add Team Member
export async function addTeamMember(member) {
    const userToken = await getCookieStore();
    let formData = new FormData();
    formData.append('name', member.name);
    formData.append('role', member.role);
    formData.append('hire_date', member.hire_date);
    formData.append('salary', member.salary);
    formData.append('email', member.email);
    formData.append('image', member.image);
    formData.append('bio', member.bio);
    formData.append('is_active', member.is_active);
    const response = await fetch(`${adminApiUrl}/team`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        body: formData,
        next: {
            cache: "no-store",
        },
    });
    const data = await response.json();
    return data;
}

// Delete Team Member
export async function deleteTeamMember(id) {
    const userToken = await getCookieStore();
    const response = await fetch(`${adminApiUrl}/team/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        cache: "no-store",
    });
    const data = await response.json();
    return data;
}
